
export interface LicenseNode {
  children: LicenseNode[];
  metadata: number[];
}

export const extractNode = (parts: number[]): LicenseNode => {
  const childrenCount = parts.shift();
  const metadataCount = parts.shift();

  if (typeof childrenCount !== 'number' || typeof metadataCount !== 'number') {
    throw Error('Something farted');
  }
  const license: LicenseNode = {
    children: [],
    metadata: [],
  };
  for (let i = 0; i < childrenCount; i += 1) {
    const child = extractNode(parts);
    license.children.push(child);
  }

  for (let i = 0; i < metadataCount; i += 1) {
    const part = parts.shift();
    if (typeof part !== 'number') {
      throw Error('Something meta-farted');
    }
    license.metadata.push(part);
  }

  return license;
};
