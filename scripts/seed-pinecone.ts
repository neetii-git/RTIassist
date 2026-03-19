import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const indexName = "rti-assist";

const authorities = [
  { id: 1, name: "Public Works Department (PWD)", pio: "Assistant Executive Engineer (Admin)", description: "Major roads and highways." },
  { id: 2, name: "Municipal Corporation", pio: "Public Information Officer", description: "Local streets, sanitation, lighting." },
  { id: 3, name: "Revenue Department", pio: "Tehsildar", description: "Land records, property tax." },
  { id: 4, name: "Health Department", pio: "Chief Medical Officer", description: "Public hospitals." },
  { id: 5, name: "Education Department", pio: "District Education Officer", description: "Schools." },
  { id: 6, name: "Police Department", pio: "SP Admin", description: "Law and order." },
  { id: 7, name: "Food Supplies", pio: "Supply Officer", description: "Ration cards." },
  { id: 8, name: "Electricity Board", pio: "Executive Engineer", description: "Power supply." },
];

async function getEmbedding(text: string): Promise<number[]> {
  const vector = new Array(1536).fill(0).map((_, i) => {
    const charCode = text.charCodeAt(i % text.length) || 0;
    return (charCode / 255) * (i % 2 === 0 ? 1 : -1);
  });
  return vector;
}

async function seed() {
  console.log("Checking Pinecone Index...");
  const indexes = await pc.listIndexes();
  const exists = indexes.indexes?.some(idx => idx.name === indexName);

  if (!exists) {
    console.log(`Creating index: ${indexName}...`);
    await pc.createIndex({
      name: indexName,
      dimension: 1536,
      metric: 'cosine',
      spec: { 
        serverless: { 
          cloud: 'aws', 
          region: 'us-east-1' 
        } 
      }
    });
    console.log("Waiting for index to be ready...");
    await new Promise(r => setTimeout(r, 60000));
  }

  const index = pc.index(indexName);
  
  for (const auth of authorities) {
    const values = await getEmbedding(`${auth.name} ${auth.description}`);
    await index.upsert({
      records: [{
        id: auth.id.toString(),
        values,
        metadata: auth
      }]
    });
    console.log(`Indexed: ${auth.name}`);
  }
  console.log("Seeding complete!");
}

seed().catch(console.error);
