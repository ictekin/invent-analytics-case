export const createSeasonArray = (totalSeason: string) => {
  const seasons = [];

  console.log(totalSeason);

  for (let i = 0; i < parseInt(totalSeason); i++) {
    seasons.push(i);
  }

  return seasons;
};
