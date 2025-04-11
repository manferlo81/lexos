export function repairRegExp(regexp: RegExp): RegExp {
  const { sticky, source, flags } = regexp
  const matchesStart = source.startsWith('^')

  // return new sticky RegExp keeping original flags
  return new RegExp(
    matchesStart ? source.slice(1) : source,
    sticky ? flags : `${flags}y`,
  )
}
