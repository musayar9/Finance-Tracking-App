import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BillCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  
  const billsData = [
    { id: 1, name: 'Electricity', amount: 120.50, date: 15, status: 'pending', color: COLORS.warning },
    { id: 2, name: 'Internet', amount: 59.99, date: 20, status: 'paid', color: COLORS.accentBlue },
    { id: 3, name: 'Netflix', amount: 15.99, date: 18, status: 'pending', color: COLORS.error },
    { id: 4, name: 'Phone', amount: 45.00, date: 25, status: 'pending', color: COLORS.secondary },
    { id: 5, name: 'Rent', amount: 1200.00, date: 1, status: 'paid', color: COLORS.primaryGreen },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const today = new Date().getDate();

  const getBillsForDate = (date: number) => {
    return billsData.filter(bill => bill.date === date);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setSelectedDate(newDate);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const bills = getBillsForDate(day);
      const isToday = day === today && currentMonth === new Date().getMonth();
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isToday && styles.todayCell
          ]}
          onPress={() => {}}
        >
          <Text style={[styles.dayNumber, isToday && styles.todayNumber]}>
            {day}
          </Text>
          {bills.length > 0 && (
            <View style={styles.billIndicators}>
              {bills.slice(0, 2).map((bill, index) => (
                <View
                  key={bill.id}
                  style={[
                    styles.billDot,
                    { backgroundColor: bill.color }
                  ]}
                />
              ))}
              {bills.length > 2 && (
                <Text style={styles.moreBills}>+{bills.length - 2}</Text>
              )}
            </View>
          )}
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const upcomingBills = billsData
    .filter(bill => bill.status === 'pending')
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bill Calendar</Text>
        <TouchableOpacity style={styles.todayButton} onPress={() => setSelectedDate(new Date())}>
          <Text style={styles.todayText}>Today</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => navigateMonth('prev')}>
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth('next')}>
            <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.weekDay}>{day}</Text>
          ))}
        </View>

        <View style={styles.calendar}>
          {renderCalendarDays()}
        </View>
      </View>

      <View style={styles.upcomingSection}>
        <Text style={styles.sectionTitle}>Upcoming Bills</Text>
        {upcomingBills.map((bill) => (
          <View key={bill.id} style={styles.upcomingBill}>
            <View style={styles.billLeft}>
              <View style={[styles.billIcon, { backgroundColor: bill.color }]}>
                <Text style={styles.billDate}>{bill.date}</Text>
              </View>
              <View style={styles.billInfo}>
                <Text style={styles.billName}>{bill.name}</Text>
                <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.daysLeft}>
              <Text style={styles.daysLeftText}>
                {bill.date - today > 0 ? `${bill.date - today} days` : 'Due today'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.legendCard}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
            <Text style={styles.legendText}>Utilities</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.accentBlue }]} />
            <Text style={styles.legendText}>Internet</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
            <Text style={styles.legendText}>Subscriptions</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.primaryGreen }]} />
            <Text style={styles.legendText}>Rent</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? 50 : SPACING.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  todayButton: {
    backgroundColor: COLORS.primaryGreen,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  todayText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  calendarCard: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  monthYear: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
  },
  weekDay: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  todayCell: {
    backgroundColor: COLORS.primaryGreen + '20',
    borderRadius: BORDER_RADIUS.sm,
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  dayNumber: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  todayNumber: {
    color: COLORS.primaryGreen,
    fontWeight: '700',
  },
  billIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  billDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  moreBills: {
    color: COLORS.muted,
    fontSize: 8,
    marginLeft: 2,
  },
  upcomingSection: {
    margin: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  upcomingBill: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  billIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  billDate: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  billAmount: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  daysLeft: {
    alignItems: 'flex-end',
  },
  daysLeftText: {
    color: COLORS.warning,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  legendCard: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  legendTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: SPACING.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  legendText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
  },
});