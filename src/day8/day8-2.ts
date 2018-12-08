import { LicenseNode } from './extractNode';
import { RootNode } from './RootNode';

const getNodeValue = (licenseNode: LicenseNode): number => {
  let total = 0;

  licenseNode.metadata.forEach((data) => {
    if (licenseNode.children.length === 0) {
      total += data;
      return;
    }
    const child = licenseNode.children[data - 1];
    if (!child) {
      return;
    }
    total += getNodeValue(child);
  });

  return total;
};

export const day8_2 = (): number => {
  const total = getNodeValue(RootNode);

  return total;
};
