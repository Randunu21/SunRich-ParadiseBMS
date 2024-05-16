import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDFReport = ({ registeredUsers, deletedUsers }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: { margin: 'auto', flexDirection: 'row' },
    tableCol: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: '#f2f2f2',
      padding: 8,
    },
    headerCol: {
      fontWeight: 'bold',
      backgroundColor: '#eaeaea',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Total Registered Users: {registeredUsers.length}</Text>
          <Text>Total Deleted Users: {deletedUsers.length}</Text>
        </View>
        <View style={styles.section}>
          <Text>Registered Users</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.headerCol]}>Username</Text>
              <Text style={[styles.tableCol, styles.headerCol]}>Email</Text>
              <Text style={[styles.tableCol, styles.headerCol]}>Name</Text>
              <Text style={[styles.tableCol, styles.headerCol]}>Age</Text>
            </View>
            {registeredUsers.map(user => (
              <View key={user._id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{user.username}</Text>
                <Text style={styles.tableCol}>{user.email}</Text>
                <Text style={styles.tableCol}>{user.name}</Text>
                <Text style={styles.tableCol}>{user.age}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text>Deleted Users</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.headerCol]}>Username</Text>
              <Text style={[styles.tableCol, styles.headerCol]}>Email</Text>
              <Text style={[styles.tableCol, styles.headerCol]}>Reason</Text>
            </View>
            {deletedUsers.map(deletion => (
              <View key={deletion._id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{deletion.userId ? deletion.userId.username : 'User data not available'}</Text>
                <Text style={styles.tableCol}>{deletion.userId ? deletion.userId.email : 'User data not available'}</Text>
                <Text style={styles.tableCol}>{deletion.reason}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReport;
//PDFReport.js