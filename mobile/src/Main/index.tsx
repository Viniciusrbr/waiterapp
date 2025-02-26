import { useState } from 'react'

import { Button } from '../components/Button'
import { Cart } from '../components/Cart'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { CartItem } from '../types/CartItem'
import { Product } from '../types/Product'
import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from './styles'

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function handleSaveTable(table: string) {
    setSelectedTable(table)
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true)
    }

    setCartItems((prevState) => {
      // Find
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      )

      // Add new item to cart if it doesn't exist
      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        })
      }

      // Increment item quantity if it already exists
      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      }

      return newCartItems
    })
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      // Find item in cart
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      )

      const item = prevState[itemIndex]
      const newCartItems = [...prevState]

      // Remove item from cart if quantity is 1
      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      // Decrement item quantity
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      }

      return newCartItems
    })
  }

  function handleResetOrder() {
    setSelectedTable('')
    setCartItems([])
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  )
}
