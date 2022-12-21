import React from 'react';
import { HistoryRecord } from '../../../types';
import { StyledRecordCard, StyledRecordCardSkeleton } from './styles';
import { recordToRecordCard } from './transfrom';

interface RecordCardProps {
  loading?: boolean;
  record?: HistoryRecord;
  onClick?: () => void;
}

export const RecordCard = ({ loading, record, onClick }: RecordCardProps) => {
  return (
    loading ? <StyledRecordCardSkeleton /> : record ? 
      <StyledRecordCard
        {...recordToRecordCard(record)}
        onClick={onClick}
      /> : <></>
  );
};
