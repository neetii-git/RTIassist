"use client";

import React, { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { NATIONAL_RTI_CONFIG, isOnline } from "@/lib/states";
import { MapPin } from "lucide-react";

const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/covid19india/covid19india.github.io/master/public/maps/india.json";

interface IndiaMapProps {
  selectedState: string;
  onStateClick: (stateName: string) => void;
}

// Map TopoJSON state names → app config keys
const TOPO_NAME_MAP: Record<string, string> = {
  "Jammu and Kashmir": "Jammu & Kashmir",
  "Jammu & Kashmir": "Jammu & Kashmir",
  "Andaman and Nicobar Islands": "Andaman & Nicobar",
  "Andaman and Nicobar": "Andaman & Nicobar",
  "Delhi": "Delhi (NCT)",
  "NCT of Delhi": "Delhi (NCT)",
  "Dadra and Nagar Haveli and Daman and Diu": "Dadra & Nagar Haveli",
  "Dadra & Nagar Haveli and Daman & Diu": "Dadra & Nagar Haveli",
  "Dadra and Nagar Haveli": "Dadra & Nagar Haveli",
  "Chandigarh": "Chandigarh",
};

// Union Territories (including UT with legislature)
const UNION_TERRITORIES = new Set([
  "Andaman & Nicobar",
  "Chandigarh",
  "Dadra & Nagar Haveli",
  "Delhi (NCT)",
  "Jammu & Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]);

type RegionType = "state" | "ut" | "central";

const getRegionType = (name: string): RegionType => {
  if (name === "Central Government") return "central";
  if (UNION_TERRITORIES.has(name)) return "ut";
  return "state";
};

const getRegionLabel = (type: RegionType): string => {
  switch (type) {
    case "ut": return "Union Territory";
    case "central": return "Central";
    default: return "State";
  }
};

const IndiaMap = ({ selectedState, onStateClick }: IndiaMapProps) => {
  const resolveState = (rawName: string): string => {
    if (NATIONAL_RTI_CONFIG[rawName]) return rawName;
    if (TOPO_NAME_MAP[rawName] && NATIONAL_RTI_CONFIG[TOPO_NAME_MAP[rawName]]) return TOPO_NAME_MAP[rawName];
    const stripped = rawName.toLowerCase().replace(/[^a-z]/g, '');
    const found = Object.keys(NATIONAL_RTI_CONFIG).find(s => {
      const sStripped = s.toLowerCase().replace(/[^a-z]/g, '');
      return stripped.includes(sStripped) || sStripped.includes(stripped);
    });
    return found || "Central Government";
  };

  const selectedType = getRegionType(selectedState);

  return (
    <div className="w-full aspect-square md:aspect-auto md:h-[550px] relative bg-card rounded-3xl border border-border shadow-2xl overflow-hidden group">
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-border">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          Tap to select
        </div>
        <div className="flex flex-col gap-1 bg-background/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: "hsla(145, 65%, 45%, 0.6)", border: "1px solid hsla(145, 65%, 45%, 0.5)" }}></div>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">State</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: "hsla(30, 95%, 55%, 0.65)", border: "1px solid hsla(30, 95%, 55%, 0.5)" }}></div>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Union Territory</span>
          </div>
        </div>
      </div>
      
      {/* Dynamic State Name Overlay */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="bg-background/95 backdrop-blur-md text-foreground px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-border/80">
           <MapPin className="w-4 h-4 text-primary shrink-0" />
           <div className="flex flex-col">
             <span className="text-sm font-bold tracking-tight leading-tight">{selectedState}</span>
             <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest">
               {getRegionLabel(selectedType)}
             </span>
           </div>
        </div>
      </div>
      
      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 1000, center: [82, 22] }}
        className="w-full h-full"
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) => 
            geographies.map((geo) => {
              const stateNameRaw = geo.properties?.st_nm || geo.properties?.name || geo.id || "";
              const matchState = resolveState(stateNameRaw);
              const isSelected = selectedState === matchState;
              const config = NATIONAL_RTI_CONFIG[matchState];
              const modeOnline = config ? isOnline(config.mode) : false;
              const regionType = getRegionType(matchState);
              const isUT = regionType === "ut";

              // Varied vibrant colors for visual distinction
              let fill: string;
              if (isSelected) {
                fill = "hsl(var(--primary))";
              } else {
                // Generate a consistent color based on state name hash
                const hash = matchState.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
                if (isUT) {
                  // UTs: Shades of Orange/Amber
                  const hues = [30, 45, 25];
                  const hue = hues[hash % hues.length];
                  fill = `hsla(${hue}, 95%, 55%, 0.55)`;
                } else {
                  // States: Shades of Green/Emerald/Teal
                  const hues = [145, 160, 175, 185, 120];
                  const hue = hues[hash % hues.length];
                  fill = `hsla(${hue}, 65%, 45%, 0.45)`;
                }
              }

              return (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  onClick={() => onStateClick(matchState)}
                  style={{
                    default: {
                      fill,
                      stroke: isSelected
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--foreground) / 0.15)",
                      strokeWidth: isSelected ? 1.5 : 0.4,
                      outline: "none",
                      transition: "all 300ms"
                    },
                    hover: {
                      fill: isSelected
                        ? "hsl(var(--primary))"
                        : isUT
                          ? "hsla(30, 95%, 55%, 0.7)"   // brighter orange on hover
                          : "hsla(145, 65%, 45%, 0.6)",  // brighter green on hover
                      stroke: "hsl(var(--primary))",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "hsl(var(--primary))",
                      outline: "none"
                    }
                  }}
                />

              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(IndiaMap);
