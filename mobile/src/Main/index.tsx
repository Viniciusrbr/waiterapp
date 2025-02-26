import { useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { Button } from '../components/Button'
import { Cart } from '../components/Cart'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Empty } from '../components/Icons/Empty'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { Text } from '../components/Text'
import { products as mochProducts } from '../mocks/products'
import { CartItem } from '../types/CartItem'
import { Product } from '../types/Product'
import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from './styles'

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

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

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator size="large" color="#D73035" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            ) : (
              <CenteredContainer>
                <Empty />
                <Text color="#666" style={{ marginTop: 24 }}>
                  Nenhum produto encontrado
                </Text>
              </CenteredContainer>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
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
