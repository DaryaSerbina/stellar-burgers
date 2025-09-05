import { FC, memo } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

interface StatusConfig {
  text: string;
  color: string;
}

const statusConfig: { [key in OrderStatusProps['status']]: StatusConfig } = {
  pending: { text: 'Готовится', color: '#E52B1A' },
  done: { text: 'Выполнен', color: '#00CCCC' },
  created: { text: 'Создан', color: '#F2F2F3' }
};

export const OrderStatus: FC<OrderStatusProps> = memo(({ status }) => {
  const { text, color } = statusConfig[status] || statusConfig.created;
  return <OrderStatusUI textStyle={color} text={text} />;
});
