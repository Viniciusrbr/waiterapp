/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'

import { CartItem } from '../../types/CartItem'
import { Product } from '../../types/Product'
import { formatCurrency } from '../../utils/formatCurrency'
import { Button } from '../Button'
import { MinusCircle } from '../Icons/MinusCircle'
import { PlusCircle } from '../Icons/PlusCircle'
import { OrderConfirmModal } from '../OrderConfirmMoal'
import { Text } from '../Text'
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles'

interface CardItemProps {
  cartItems: CartItem[]
  onAdd: (product: Product) => void
  onDecrement: (product: Product) => void
  onConfirmOrder: () => void
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
}: CardItemProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price
  }, 0)

  function handleConfirmOrder() {
    setIsModalVisible(true)
  }

  function handleOk() {
    onConfirmOrder()
    setIsModalVisible(false)
  }

  return (
    <>
      <OrderConfirmModal visible={isModalVisible} onOk={handleOk} />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItems) => cartItems.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 200 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.18.30:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  )
}
