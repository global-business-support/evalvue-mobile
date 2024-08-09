import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {captureRef} from 'react-native-view-shot';
import {primary} from '../Styles/customStyle';
import EvalvueLogo from '../../assets/evalvue-logo.jpg';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
const Receipt = ({visible, onClose, paymentResponseList}) => {
  const viewShotRef = useRef();

  const handleDownload = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      });
      console.log(uri)
      const path = `${RNFS.PicturesDirectoryPath}/receipt.png`;
      await RNFS.moveFile(uri, path);
      console.log('Receipt saved to:', path);
      Alert.alert('Success', 'Receipt downloaded successfully in Pictures folder');
    } catch (error) {
      console.error('Error saving receipt:', error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade">
      <View style={styles.overlay}>
          <View style={styles.container}  ref={viewShotRef}>
                <View style={styles.header}>
                <Image source={EvalvueLogo} style={styles.logo} />
                <View style={styles.iconContainer}>
                    <Ionicons name="receipt-outline" size={24} color="#3b82f6" />
                </View>
                </View>
                <View style={styles.content}>
                <Text style={styles.greeting}>
                    Hello,{' '}
                    <Text style={styles.organizationName}>
                    {paymentResponseList.organization_name}
                    </Text>
                </Text>
                <Text style={styles.message}>
                    We are pleased to inform you that your recent payment of{' '}
                    <Text style={styles.amount}>
                    ₹{paymentResponseList.amount}.00
                    </Text>{' '}
                    has been successfully processed. Thank you for your prompt
                    payment. This receipt confirms the transaction.
                </Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                    <Text style={styles.detailValue}>Order Id:</Text>
                    <Text style={styles.detailValue}>
                        {paymentResponseList.razorpay_order_id}
                    </Text>
                    </View>
                    <View style={styles.detailRow}>
                    <Text style={styles.detailValue}>Transaction Id:</Text>
                    <Text style={styles.detailValue}>
                        {paymentResponseList.transaction_id}
                    </Text>
                    </View>
                    <View style={styles.detailRow}>
                    <Text style={styles.detailValue}>Billing Cycle:</Text>
                    <Text style={styles.detailValue}>Monthly</Text>
                    </View>
                    <View style={styles.detailRow}>
                    <Text style={styles.detailValue}>Payment Mode:</Text>
                    <Text style={styles.detailValue}>
                        {paymentResponseList.payment_mode}
                    </Text>
                    </View>
                    <View style={styles.detailRow}>
                    <Text style={styles.detailValue}>Date: </Text>
                    <Text style={styles.detailValue}>
                        {paymentResponseList.date}
                    </Text>
                    </View>
                    <View style={styles.amountDetails}>
                    <View style={styles.amountRow}>
                        <Text style={styles.amountValue}>Amount:</Text>
                        <Text style={styles.amountValue}>
                        ₹
                        {paymentResponseList.amount -
                            (paymentResponseList.amount * 18) / 100}
                        </Text>
                    </View>
                    <View style={styles.amountRow}>
                        <Text style={styles.amountValue}>Total GST: </Text>
                        <Text style={styles.amountValue}>
                        ₹{(paymentResponseList.amount * 18) / 100}
                        </Text>
                    </View>
                    <View style={styles.amountRow}>
                        <Text style={styles.amountValue}>CGST: </Text>
                        <Text style={styles.amountValue}>
                        ₹{(paymentResponseList.amount * 18) / 100 / 2}
                        </Text>
                    </View>
                    <View style={styles.amountRow}>
                        <Text style={styles.amountValue}>SGST:</Text>
                        <Text style={styles.amountValue}>
                        ₹{(paymentResponseList.amount * 18) / 100 / 2}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalAmountRow}>
                        <Text style={styles.amountValue}>Total Amount: </Text>
                        <Text style={styles.totalAmountValue}>
                        ₹{paymentResponseList.amount}.00
                        </Text>
                    </View>
                    </View>
                </View>
                {paymentResponseList.payment_status === 'captured' ||
                paymentResponseList.payment_status === 'refunded' ? (
                    <Text style={styles.successMessage}>
                    Paid Successfully
                    {paymentResponseList.payment_status === 'refunded'
                        ? ' this amount will be refundable'
                        : ''}
                    </Text>
                ) : (
                    <Text style={styles.errorMessage}>
                    Payment Failed: {paymentResponseList.reason}
                    </Text>
                )}
                </View>
                <View style={styles.footer}>
                <TouchableOpacity style={styles.okButton} onPress={onClose}>
                    <Text style={styles.okButtonText}>Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.printButton}
                    onPress={handleDownload}>
                    <Text style={styles.printButtonText}>Download</Text>
                </TouchableOpacity>
                </View>
          </View>
      </View>
    </Modal>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
  },
  
container: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: '100%',
    width: '100%',
  },
  snapshot : {
    height: '80%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    height: 50,
    width: 50,
    position: 'absolute',
    left: 0,
  },
  iconContainer: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 10,
  },
  greeting: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  organizationName: {
    color: '#3b82f6',
    fontSize: 20,
  },
  message: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 5,
    marginBottom: 15,
  },
  amount: {
    fontWeight: '600',
  },
  detailsContainer: {
    backgroundColor: '#f3f4f6',
    height: 300,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: 15,
  },
  detailRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailValue: {
    fontWeight: '400',
    fontSize: 16,
    color: '#4b5563',
  },
  amountDetails: {
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: 'white',
    paddingTop: 10,
  },
  amountRow: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-between',
    color: '#1f2937',
  },
  amountValue: {
    fontWeight: '400',
    fontSize: 16,
    color: '#4b5563',
  },
  divider: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#9ca3af',
  },
  totalAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  totalAmountValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
  },
  successMessage: {
    fontSize: 15,
    color: '#10b981',
    fontWeight: '500',
  },
  errorMessage: {
    fontSize: 15,
    color: '#ef4444',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  okButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  okButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  printButton: {
    borderColor: '#3b82f6',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  printButtonText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
});
