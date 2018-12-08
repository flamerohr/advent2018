import { license } from './license';
import { extractNode, LicenseNode } from './extractNode';

const getLicenseNode = (): LicenseNode => {
  const parts: number[] = license.split(' ').map(Number);

  return extractNode(parts);
};

export const RootNode = getLicenseNode();
