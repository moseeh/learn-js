async function all(objs = {}) {
  if (Object.keys(objs).length === 0) return {};

  const entries = Object.entries(objs);
  const resolvedEntries = await Promise.all(
    entries.map(async ([key, value]) => [key, await value])
  );

  return Object.fromEntries(resolvedEntries);
}
