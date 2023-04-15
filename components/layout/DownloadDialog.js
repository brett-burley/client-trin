import { View } from 'react-native';
import { Dialog } from '@rneui/themed';

export default function DownloadDialog({ show, children })
{
  const styles = {
    padding: 20,
    textAlign: 'center',
  };

  return (
    <Dialog
      isVisible={show}
      overlayStyle={{ maxWidth: '50%' }}
    >
      <View style={styles}>
        { children }
      </View>
    </Dialog>
  );
}
