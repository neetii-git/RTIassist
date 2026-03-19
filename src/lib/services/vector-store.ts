import { Pinecone } from "@pinecone-database/pinecone";

const isBuildTime = process.env.NODE_ENV === "production" && !process.env.PINECONE_API_KEY;

const realPc = !isBuildTime ? new Pinecone({
  apiKey: process.env.PINECONE_API_KEY! || "mock-key",
}) : null;

// Build-safe export
export const pc = realPc || {
  index: () => ({
    upsert: async () => {},
    query: async () => ({ matches: [] })
  })
} as any;

const indexName = process.env.PINECONE_INDEX_NAME || "rti-assist";

async function getEmbedding(text: string): Promise<number[]> {
  const vector = new Array(1536).fill(0).map((_, i) => {
    const charCode = text.charCodeAt(i % text.length) || 0;
    return (charCode / 255) * (i % 2 === 0 ? 1 : -1);
  });
  return vector;
}

export async function upsertAuthority(id: string, text: string, metadata: any) {
  if (!pc) return;
  const index = (pc as Pinecone).index(indexName);
  const values = await getEmbedding(text);
  
  await index.upsert({
    records: [{
      id,
      values,
      metadata
    }]
  });
}

export async function queryAuthority(complaint: string) {
  if (!pc) return null;
  const index = (pc as Pinecone).index(indexName);
  const values = await getEmbedding(complaint);

  const results = await index.query({
    vector: values,
    topK: 1,
    includeMetadata: true
  });

  return results.matches[0];
}
