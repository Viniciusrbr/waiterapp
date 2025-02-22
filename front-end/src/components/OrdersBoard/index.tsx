import { useState } from 'react'

import { Order } from '../../types/Order'
import { OrderModal } from '../OrderModal'
import { Board, OrdersContainer } from './styles'

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  function handleOpenModel(order: Order) {
    setIsModalOpen(true)
    setSelectedOrder(order)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  return (
    <Board>
      <OrderModal
        order={selectedOrder}
        visible={isModalOpen}
        onClose={handleCloseModal}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
      </header>

      <OrdersContainer>
        {orders.map((order) => (
          <button
            onClick={() => handleOpenModel(order)}
            type="button"
            key={order._id}
          >
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens</span>
          </button>
        ))}
      </OrdersContainer>
    </Board>
  )
}
