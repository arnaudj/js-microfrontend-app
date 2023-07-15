import { Button } from 'ds/Button';
import { Card } from 'ds/Card';
import { CardActions } from 'ds/CardActions';
import { CardContent } from 'ds/CardContent';
import { Collapse } from 'ds/Collapse';
import { IconButton } from 'ds/IconButton';
import { Typography } from 'ds/Typography';
import React from 'react';

export default function AssetsAllocation() {
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
              Assets allocation
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              In percentage of portfolio
            </Typography>
          </CardContent>
        </Card>
      </Collapse>
    </div>
  );
}
