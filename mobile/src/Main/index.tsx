import { Header } from "../components/Header";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";

export function Main() {
  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          {/* Categories */}
        </CategoriesContainer>

        <MenuContainer>
          {/* Menu */}
        </MenuContainer>

      </Container>

      <Footer>
        {/* Footer */}
        <FooterContainer></FooterContainer>
      </Footer>
    </>
  );
}
