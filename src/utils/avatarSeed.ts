// Deterministic avatar assignment based on name
export const getAvatarUrl = (name: string, size = 80): string => {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const id = (hash % 70) + 1; // pravatar has 1-70
  return `https://i.pravatar.cc/${size}?img=${id}`;
};

export const getAgentAvatarUrl = (name: string, size = 80): string => {
  // Use fixed professional-looking IDs for agents
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const professionalIds = [3, 5, 7, 8, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 25, 26, 27, 28, 32, 33];
  const id = professionalIds[hash % professionalIds.length];
  return `https://i.pravatar.cc/${size}?img=${id}`;
};
