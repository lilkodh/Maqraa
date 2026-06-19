import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography, shadows } from '../utils/theme';

export default function RemoveBooksScreen({
  books = [],
  onDeleteBook,
  onBack,
}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Remove Books</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Select a book to remove it from your library.</Text>

        {books.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="library-books" size={64} color={colors.textSecondary} style={{ opacity: 0.3 }} />
            <Text style={styles.emptyText}>No books in library to remove.</Text>
          </View>
        ) : (
          books.map((b) => {
            const progressPercent = Math.round((b.readPages / b.totalPages) * 100) || 0;
            return (
              <View key={b.id} style={[styles.bookRow, shadows.card]}>
                <View style={styles.bookInfo}>
                  <View style={styles.coverContainer}>
                    <Image source={{ uri: b.coverUrl }} style={styles.coverImage} resizeMode="cover" />
                  </View>
                  <View style={styles.textDetails}>
                    <Text style={styles.bookTitle} numberOfLines={1}>{b.title}</Text>
                    <Text style={styles.bookAuthor} numberOfLines={1}>{b.author}</Text>
                    <Text style={styles.bookProgress}>
                      {b.readPages} / {b.totalPages} pages ({progressPercent}%)
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.trashButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    Alert.alert(
                      "Confirm Removal",
                      `Are you sure you want to remove '${b.title}' from your library?`,
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Remove",
                          style: "destructive",
                          onPress: () => onDeleteBook(b.id),
                        }
                      ]
                    );
                  }}
                >
                  <MaterialIcons name="delete-forever" size={24} color={colors.error} />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginEdge,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(250, 246, 240, 0.8)',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  backButton: {
    padding: 8,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginEdge,
    paddingTop: spacing.lg,
    paddingBottom: 40,
  },
  subtitle: {
    fontFamily: 'Inter_300Light',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
  bookRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: radii.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  coverContainer: {
    width: 50,
    height: 70,
    borderRadius: radii.sm,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  textDetails: {
    marginLeft: 16,
    flex: 1,
  },
  bookTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  bookAuthor: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bookProgress: {
    fontFamily: 'Inter_300Light',
    fontSize: 11,
    color: colors.primary,
    marginTop: 4,
  },
  trashButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(186, 26, 26, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.15)',
  },
});
