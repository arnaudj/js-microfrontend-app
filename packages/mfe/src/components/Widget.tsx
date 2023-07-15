import { Card } from 'ds/Card';
import { CardContent } from 'ds/CardContent';
import { Collapse } from 'ds/Collapse';
import { IconButton } from 'ds/IconButton';
import { Typography } from 'ds/Typography';
import React from 'react';

interface WidgetProps {
  title: string;
  subTitle?: string;
  children: any;
}

export default function Widget({ title, subTitle, children }: WidgetProps) {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div style={{ minWidth: '275px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <IconButton onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? '^' : '⌄'}
        </IconButton>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {subTitle}
            </Typography>
            {children}
          </CardContent>
        </Card>
      </Collapse>
    </div>
  );
}
