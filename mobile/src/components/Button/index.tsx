import { ActivityIndicator } from 'react-native';
import { Container } from './styles';
import { Text } from '../Text';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ children, onPress, disabled, loading }: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (
        <Text weight='600' color='#fff'>
          {children}
        </Text>
      )}

      {loading && (
        <ActivityIndicator
          color="#fff"
        />
      )}
    </Container>
  );
}