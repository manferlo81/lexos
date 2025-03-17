export function repairRegExp(regexp: RegExp): RegExp {

  // return original RegExp if it matches the start
  const source = regexp.source
  if (source.startsWith('^')) return regexp

  // return new RegExp matching start
  return new RegExp(`^${source}`, regexp.flags)
}
