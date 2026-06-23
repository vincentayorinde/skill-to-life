export interface ResultCardData {
  title: string;
  emoji: string;
  percentage: number;
  matchTier: string;
  insight: string;
  stats?: { label: string; value: number }[];
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (ctx.measureText(nextLine).width <= maxWidth) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

export async function generateResultCard(
  data: ResultCardData,
  format: 'square' | 'story',
): Promise<Blob> {
  const width = 1080;
  const height = format === 'story' ? 1920 : 1080;
  const centerX = width / 2;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  const background = ctx.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, '#0d0d1a');
  background.addColorStop(1, '#1a0a2e');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const vignette = ctx.createRadialGradient(
    centerX,
    height / 2,
    0,
    centerX,
    height / 2,
    Math.hypot(width, height) / 2,
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let y = height / 3;

  ctx.font = '500 14px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('MY SKILL TO LIFE', centerX, y);
  y += 14 / 2 + 20 + 80 / 2;

  ctx.font = '80px serif';
  ctx.fillText(data.emoji, centerX, y);
  y += 80 / 2 + 24;

  const titleFontSize = data.title.length > 20 ? 56 : 72;
  y += titleFontSize / 2;
  ctx.font = `bold ${titleFontSize}px Inter, sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(data.title, centerX, y);
  y += titleFontSize / 2 + 24;

  const badgeWidth = 240;
  const badgeHeight = 56;
  const badgeX = centerX - badgeWidth / 2;
  drawRoundedRect(ctx, badgeX, y, badgeWidth, badgeHeight, 28);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${data.percentage}% match`, centerX, y + badgeHeight / 2);
  y += badgeHeight + 12;

  ctx.font = '16px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText(data.matchTier, centerX, y + 8);
  y += 16 + 24;

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.moveTo(centerX - 60, y);
  ctx.lineTo(centerX + 60, y);
  ctx.stroke();
  y += 28;

  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  const insightLines = wrapText(ctx, `"${data.insight}"`, 480);
  const insightLineHeight = 30;

  for (const line of insightLines) {
    ctx.fillText(line, centerX, y);
    y += insightLineHeight;
  }

  y += 40;
  ctx.font = 'bold 22px Inter, sans-serif';
  ctx.fillStyle = '#60a5fa';
  ctx.fillText('What path fits you? 👇', centerX, y);

  if (data.stats?.length) {
    const statsToShow = data.stats.slice(0, 4);
    const barWidth = 400;
    const barX = centerX - barWidth / 2;

    y += 28;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.moveTo(centerX - 100, y);
    ctx.lineTo(centerX + 100, y);
    ctx.stroke();
    y += 16;

    ctx.font = '500 11px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.textAlign = 'center';
    ctx.fillText('SIGNAL BREAKDOWN', centerX, y);
    y += 18;

    for (const stat of statsToShow) {
      ctx.textAlign = 'left';
      ctx.font = '500 13px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillText(stat.label, barX, y);

      ctx.textAlign = 'right';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(`${stat.value}%`, barX + barWidth, y);

      y += 10;

      drawRoundedRect(ctx, barX, y, barWidth, 5, 2.5);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fill();

      const fillWidth = Math.max((barWidth * stat.value) / 100, 8);
      drawRoundedRect(ctx, barX, y, fillWidth, 5, 2.5);
      ctx.fillStyle = 'rgba(96,165,250,0.7)';
      ctx.fill();

      y += 5 + 10;
    }

    ctx.textAlign = 'center';
  }

  ctx.font = '14px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('skilltolife.com', width - 32, height - 32);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error('Canvas.toBlob returned null'));
      },
      'image/png',
      1.0,
    );
  });
}
