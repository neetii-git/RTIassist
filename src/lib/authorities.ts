import { Authority } from "@/types/rti";

export const authorities: Authority[] = [
  { 
    id: 1, 
    name: "Public Works Department (PWD)", 
    pio: "Assistant Executive Engineer (Admin)", 
    description: "Major roads, highways, and government buildings.",
    portal: "https://rtionline.gov.in" 
  },
  { 
    id: 2, 
    name: "Municipal Corporation", 
    pio: "Public Information Officer, City Zone", 
    description: "Local streets, sanitation, lighting, and garbage.",
    portal: "https://rtionline.gov.in"
  },
  { 
    id: 3, 
    name: "Revenue Department", 
    pio: "Tehsildar / Deputy Collector", 
    description: "Land records, property tax, and certificates.",
    portal: "https://rtionline.gov.in"
  },
  { 
    id: 4, 
    name: "Health & Family Welfare", 
    pio: "Chief Medical Officer", 
    description: "Public hospitals and health schemes.",
    portal: "https://rtionline.gov.in"
  },
  { 
    id: 5, 
    name: "Education Department", 
    pio: "District Education Officer", 
    description: "Government schools and scholarships.",
    portal: "https://rtionline.gov.in"
  },
  { 
    id: 6, 
    name: "Police Department", 
    pio: "Superintendent of Police (Admin)", 
    description: "Law and order, FIR status, and security.",
    portal: "https://rtionline.gov.in"
  },
  { 
    id: 7, 
    name: "Food & Civil Supplies", 
    pio: "District Supply Officer", 
    description: "Ration cards and PDS shops.",
    portal: "https://rtionline.gov.in"
  },
  { 
    id: 8, 
    name: "Electricity Board / DISCOM", 
    pio: "Executive Engineer (Commercial)", 
    description: "Power supply and billing disputes.",
    portal: "https://rtionline.gov.in"
  },
];

export const isOfflineOnly = (state?: string) => {
  const offlineStates = ["Bihar", "Jharkhand", "Chhattisgarh", "Assam"];
  return state ? offlineStates.includes(state) : false;
};
