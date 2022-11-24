import React from 'react';
import { HistoryRecord } from '../../../types';
import { StyledRecordCard } from './styles';
import { recordToRecordCard } from './transfrom';

interface RecordCardProps {
  record: HistoryRecord;
  onClick?: () => void;
}

export const RecordCard = ({record, onClick}: RecordCardProps) => {
  return (
    <StyledRecordCard
      {...recordToRecordCard(record)}
      onClick={onClick}
    />
  );
};
