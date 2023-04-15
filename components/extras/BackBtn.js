import { Icon, Button } from '@rneui/themed';

export default function BackBtn({ onPress, children })
{
  return (
    <Button type="solid" color="error" onPress={onPress} size="lg">
      <Icon name="arrow-back-ios" color="white"/>
      {children}
    </Button>
  );
}
