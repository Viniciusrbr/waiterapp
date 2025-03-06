import { useEffect } from 'react'

import closeIcon from '../../assets/images/close-icon.svg'
import { Order } from '../../types/Order'
import { formatCurrency } from '../../utils/formatCurrency'
import { Actions, ModalBody, OrderDetails, Overlay } from './styles'

interface OrderModalProps {
  visible: boolean
  order: Order | null
  onClose: () => void
  onCancelOrder: () => Promise<void>
  onChangeOrderStatus: () => Promise<void>
  isLoading: boolean
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus,
}: OrderModalProps) {
  // fecha o modal ao apertar a tecla ESC
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!visible || !order) {
    return null
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity
  }, 0)

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Fechar modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>{order.status === 'WAITING' && '⏱'}</span>
            <span>{order.status === 'IN_PRODUCTION' && '👨‍🍳'}</span>
            <span>{order.status === 'DONE' && '✅'}</span>

            <strong>{order.status === 'WAITING' && 'Fila de espera'}</strong>
            <strong>
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
            </strong>
            <strong>{order.status === 'DONE' && 'Pronto'}</strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />
                <span className="quantity">{quantity}x</span>

                <div className="product-datails">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button
              type="button"
              className="primary"
              onClick={onChangeOrderStatus}
              disabled={isLoading}
            >
              <span>
                {order.status === 'WAITING' && '👨‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir o pedido'}
              </strong>
            </button>
          )}

          <button
            onClick={onCancelOrder}
            disabled={isLoading}
            type="button"
            className="secondary"
          >
            <strong>Cancelar Pedido</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  )
}
