export interface Options {
  onlyDefault: boolean;
}

export default async function safeImport(path: string, opt?: Options) {
  const namedX = await import(path);
  if (namedX.default && opt?.onlyDefault) {
    return namedX.default;
  }
  return namedX;
}
