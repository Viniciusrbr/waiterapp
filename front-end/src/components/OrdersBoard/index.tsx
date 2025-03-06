import { useState } from 'react'
import { toast } from 'react-toastify'

import { Order } from '../../types/Order'
import { api } from '../../utils/api'
import { OrderModal } from '../OrderModal'
import { Board, OrdersContainer } from './styles'

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
  onRefreshOrder: (orderId: string) => void
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onRefreshOrder,
}: OrdersBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleOpenModel(order: Order) {
    setIsModalOpen(true)
    setSelectedOrder(order)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  async function handleCancelOrder() {
    if (!selectedOrder) {
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    await api.delete(`/orders/${selectedOrder._id}`)

    toast.success(
      `O pedido da mesa ${selectedOrder.table} foi cancelado com sucesso!`,
    )

    onRefreshOrder(selectedOrder._id)
    setIsLoading(false)
    setIsModalOpen(false)
  }

  return (
    <Board>
      <OrderModal
        order={selectedOrder}
        visible={isModalOpen}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
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
