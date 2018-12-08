import { LicenseNode } from './extractNode';
import { RootNode } from './RootNode';

const accumulateMetadata = (licenseNode: LicenseNode): number => {
  let total = 0;

  licenseNode.metadata.forEach(data => total += data);
  licenseNode.children.forEach(child => total += accumulateMetadata(child));

  return total;
};

export const day8_1 = (): number => {
  const total = accumulateMetadata(RootNode);

  return total;
};
