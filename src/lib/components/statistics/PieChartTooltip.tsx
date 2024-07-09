import type { TooltipProps } from 'recharts';

import { formatDurationToString } from '~/utils/timeUtils';

export const PieChartTooltip: React.FC<
  TooltipProps<number, string> & { colorMode: string }
> = ({ active, payload, colorMode }) => {
  const textColor = colorMode === 'light' ? '#000' : '#fff'; // Adjust colors as needed
  const backgroundColor = colorMode === 'light' ? '#fff' : '#000'; // Adjust colors as needed
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor,
          padding: '5px',
          border: '1px solid #cccccc',
          color: textColor,
        }}
      >
        <p className="label">{`${payload[0]?.name} : ${formatDurationToString(
          payload[0]?.value || 0
        )}`}</p>
      </div>
    );
  }

  return null;
};
