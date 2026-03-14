const SalaryChart = ({ data }) => {
  const parseSalary = (salary) => Number(salary.replace(/[$,]/g, ""));

  const cityTotals = {};

  data.forEach((row) => {
    const city = row[2];
    const salary = parseSalary(row[5]);

    cityTotals[city] = (cityTotals[city] || 0) + salary;
  });

  const cities = Object.keys(cityTotals);
  const values = Object.values(cityTotals);

  const maxSalary = Math.max(...values);

  const chartHeight = 300;
  const barWidth = 60;
  const gap = 40;

  return (
    <svg width={cities.length * (barWidth + gap)} height={350}>
      {cities.map((city, index) => {
        const value = cityTotals[city];

        const barHeight = (value / maxSalary) * chartHeight;

        const x = index * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <g key={city}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#22c55e"
            />

            <text x={x + 5} y={chartHeight + 20} fontSize="12">
              {city}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
export default SalaryChart;
