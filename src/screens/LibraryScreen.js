import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Animated,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  PanResponder,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { colors, radii, spacing, shadows } from '../utils/theme';
import BookCard from '../components/BookCard';
import ProgressRing from '../components/ProgressRing';
import { StatCard } from '../components/StatCard';
import { router, useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import useBookStore from '../store/bookStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function GestureBottomSheet({ visible, onClose, children }) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        if (dy < 0) {
          translateY.setValue(dy * 0.15);
        } else {
          translateY.setValue(dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy, vy } = gestureState;

        if (dy > 120 || vy > 0.5) {
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: SCREEN_HEIGHT,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onClose();
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    })
  ).current;

  if (!shouldRender) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
     
      <Animated.View
        style={[
          styles.modalOverlayBackdrop,
          {
            opacity: backdropOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => {
            Animated.parallel([
              Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
              }),
            ]).start(() => {
              onClose();
            });
          }}
        />
      </Animated.View>
      <View style={styles.modalOverlayContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View {...panResponder.panHandlers} style={styles.dragHandleArea}>
            <View style={styles.bottomSheetHandle} />
          </View>
          {children}
        </Animated.View>
      </View>
    </View>
  );
}

export default function LibraryScreen() {
  const books = useBookStore((state) => state.books);
  const profilePhoto = useBookStore((state) => state.profilePhoto);
  const addBook = useBookStore((state) => state.addBook);
  const deleteBook = useBookStore((state) => state.deleteBook);
  const setProfilePhoto = useBookStore((state) => state.setProfilePhoto);
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const finishedBooksCount = books.filter(
    (book) => book.status === "completed"
  ).length;

  const totalPagesRead = books.reduce((total, book) => {
    return total + (book.currentPage || 0);
  }, 0);

  const goalCount = 12;
  const goalProgress = goalCount > 0 ? finishedBooksCount / goalCount : 0;
  const streakCount = 0;

  const [isExpanded, setIsExpanded] = useState(false);

  const [isAddBookVisible, setIsAddBookVisible] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookPages, setNewBookPages] = useState('');
  const [newBookCover, setNewBookCover] = useState(null);
  const [isRemoveBookVisible, setIsRemoveBookVisible] = useState(false);

  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  const anim4 = useRef(new Animated.Value(0)).current;
  const mainRotate = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: (isAddBookVisible || isRemoveBookVisible) ? { display: 'none' } : undefined
    });
    return () => {
      navigation.setOptions({
        tabBarStyle: undefined
      });
    };
  }, [isAddBookVisible, isRemoveBookVisible, navigation]);

  useEffect(() => {
    if (isExpanded) {
      Animated.parallel([
        Animated.timing(mainRotate, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.stagger(150, [
          Animated.spring(anim1, {
            toValue: 1,
            tension: 10,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(anim2, {
            toValue: 1,
            tension: 10,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(anim3, {
            toValue: 1,
            tension: 10,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(anim4, {
            toValue: 1,
            tension: 10,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(mainRotate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.stagger(100, [
          Animated.timing(anim4, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim3, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim2, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim1, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [isExpanded]);

  const handleClose = (callback) => {
    setIsExpanded(false);
    if (callback) {
      setTimeout(callback, 300);
    }
  };

  const rotation = mainRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  const handlePickCover = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewBookCover(result.assets[0].uri);
    }
  };

  const handleSaveBook = () => {
    if (!newBookTitle || !newBookPages) {
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title: newBookTitle,
      author: newBookAuthor || "Unknown Author",
      totalPages: Number(newBookPages),
      currentPage: 0,
      status: "to-read",
      coverImage: newBookCover,
    };

    addBook(newBook);

    setNewBookTitle("");
    setNewBookAuthor("");
    setNewBookPages("");
    setNewBookCover(null);
    setIsAddBookVisible(false);
  };

  const handleAddPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleStartSession = () => {
    const readingBook = books.find(
      (book) => book.status === "reading"
    );

    if (readingBook) {
      router.push(`/book/${readingBook.id}`);
      return;
    }

    if (books.length > 0) {
      router.push(`/book/${books[0].id}`);
      return;
    }

    Alert.alert(
      "No Books",
      "Add a book before starting a reading session."
    );
  };

  const sub1TranslateX = 0;
  const sub1TranslateY = anim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -110],
  });

  const sub2TranslateX = anim2.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, -10, -55],
  });
  const sub2TranslateY = anim2.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, -70, -95.3],
  });

  const sub3TranslateX = anim3.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, -40, -95.3],
  });
  const sub3TranslateY = anim3.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, -35, -55],
  });

  const sub4TranslateX = anim4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -110],
  });
  const sub4TranslateY = anim4.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -20, 0],
  });

  const sub1Scale = anim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const sub2Scale = anim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const sub3Scale = anim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const sub4Scale = anim4.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const subButtons = [
    {
      id: 'photo',
      icon: 'add-a-photo',
      label: 'Add Photo',
      translateX: sub1TranslateX,
      translateY: sub1TranslateY,
      scale: sub1Scale,
      opacity: anim1,
      onPress: () => handleClose(handleAddPhoto),
    },
    {
      id: 'session',
      icon: 'play-arrow',
      label: 'Start Session',
      translateX: sub2TranslateX,
      translateY: sub2TranslateY,
      scale: sub2Scale,
      opacity: anim2,
      onPress: () => handleClose(handleStartSession),
    },
    {
      id: 'book',
      icon: 'library-add',
      label: 'Add Book',
      translateX: sub3TranslateX,
      translateY: sub3TranslateY,
      scale: sub3Scale,
      opacity: anim3,
      onPress: () => {
        handleClose(() => setIsAddBookVisible(true));
      },
    },
    {
      id: 'remove',
      icon: 'delete-sweep',
      label: 'Remove Book',
      translateX: sub4TranslateX,
      translateY: sub4TranslateY,
      scale: sub4Scale,
      opacity: anim4,
      onPress: () => {
        handleClose(() => setIsRemoveBookVisible(true));
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarShadow}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: profilePhoto || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHzrnCzrjwiROv4PgItFRGi_VHtq8llyf5FvHi7lnD5c8IPzpKhVNCIyVosynMT0wUrjgEd-BIUKidJzTCpiIxT6tcMjSbDghw6khyZYiTEcf4mNw7Rdb1ziSYiqlmjyADoNYl2guZvJWLVWO4WpjTjBsgKqeIaY88ZTrAj0TzEh3hiw8JIKH5H6jVUFs8JWoy2XldrZ7tHpj5RJyn_3cfbFFtW62BP4MRPL3Z8MypK1elrpJzmf-ErSpdkFtGBNv9nRwH_T0plQI',
                }}
                style={styles.avatar}
              />
            </View>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.welcomeText}>Good morning,</Text>
            <Text style={styles.userName}>Khalid Drihem</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerSearchButton} activeOpacity={0.7}>
          <MaterialIcons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {['General', 'History', 'Literature', 'Magazine', 'Diary'].map((cat, idx) => {
            const isActive = idx === 0;
            return (
              <View key={cat} style={styles.categoryWrapper}>
                <TouchableOpacity
                  style={[styles.categoryCard, isActive && styles.categoryCardActive, shadows.card]}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name={idx === 0 ? 'auto-stories' : idx === 1 ? 'history' : idx === 2 ? 'self-improvement' : idx === 3 ? 'article' : 'menu-book'}
                    size={20}
                    color={isActive ? colors.secondary : colors.textSecondary}
                  />
                </TouchableOpacity>
                <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>{cat}</Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.searchContainer}>
          <View style={styles.searchPill}>
            <MaterialIcons name="search" size={22} color={colors.textSecondary} style={styles.searchIcon} />
           <TextInput
  placeholder="Search books..."
  style={styles.searchInput}
  value={searchText}
  onChangeText={setSearchText}
/>
          </View>
        </View>

        <View style={[styles.goalCard, shadows.card]}>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>2026 Goal</Text>
            <Text style={styles.goalSubtitle}>{finishedBooksCount} of {goalCount} books completed</Text>
            <View style={styles.onTrackBadge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>On Track</Text>
            </View>
          </View>
          <ProgressRing progress={goalProgress} size={88} strokeWidth={8} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Books</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.showMoreButton}>Show More</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.booksCarousel}
        >
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onPress={() => router.push(`/book/${book.id}`)} />
          ))}
        </ScrollView>

        <View style={styles.dividerContainer}>
          <Svg height="12" width="100%" viewBox="0 0 100 12" preserveAspectRatio="none">
            <Path d="M0 10C25 10 25 2 50 2C75 2 75 10 100 10" stroke="#bdc9c1" strokeWidth="1.5" fill="none" />
          </Svg>
        </View>

        <Text style={styles.sectionTitleStats}>Statistics</Text>
        <View style={styles.statsGrid}>
          <StatCard title="Total Books" value={books.length} iconName="library-books" iconColor={colors.secondary} />
          <StatCard title="Pages Read" value={totalPagesRead >= 1000 ? `${(totalPagesRead / 1000).toFixed(1)}k` : totalPagesRead} iconName="auto-stories" iconColor={colors.primary} />
          <StatCard title="This Month" value={finishedBooksCount} iconName="verified" iconColor={colors.tertiary} />
          <StatCard title="Day Streak" value={streakCount} iconName="whatshot" iconColor={colors.secondary} />
        </View>
      </ScrollView>

      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
          },
        ]}
        pointerEvents={isExpanded ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={styles.backdropPressable}
          activeOpacity={1}
          onPress={() => setIsExpanded(false)}
        />
      </Animated.View>

      {subButtons.map((btn) => (
        <Animated.View
          key={btn.id}
          style={[
            styles.subButtonContainer,
            {
              opacity: btn.opacity,
              transform: [
                { translateX: btn.translateX },
                { translateY: btn.translateY },
                { scale: btn.scale },
              ],
            },
          ]}
          pointerEvents={isExpanded ? 'auto' : 'none'}
        >
          <TouchableOpacity
            style={[styles.subButton, shadows.active]}
            onPress={btn.onPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name={btn.icon} size={20} color={colors.white} />
          </TouchableOpacity>
        </Animated.View>
      ))}

      <View
        style={styles.fabContainer}
      >
        <TouchableOpacity
          style={[styles.fab, shadows.active]}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <MaterialIcons name="add" size={32} color={colors.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <GestureBottomSheet
        visible={isAddBookVisible}
        onClose={() => setIsAddBookVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalKeyboardAvoiding}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Book</Text>
            <TouchableOpacity onPress={() => setIsAddBookVisible(false)} style={styles.modalCloseButton} activeOpacity={0.7}>
              <MaterialIcons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalForm}>
            <TouchableOpacity style={styles.coverPickerContainer} onPress={handlePickCover} activeOpacity={0.8}>
              {newBookCover ? (
                <View style={styles.coverPreviewWrapper}>
                  <Image source={{ uri: newBookCover }} style={styles.coverPreviewImage} resizeMode="cover" />
                  <View style={styles.changeCoverBadge}>
                    <MaterialIcons name="photo-camera" size={14} color={colors.white} />
                    <Text style={styles.changeCoverText}>Change Cover</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.coverPickerPlaceholder}>
                  <MaterialIcons name="add-photo-alternate" size={40} color={colors.textSecondary} />
                  <Text style={styles.coverPickerLabel}>Upload Book Cover</Text>
                  <Text style={styles.coverPickerHint}>Tap to browse photo library</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.formField}>
              <Text style={styles.formLabel}>Book Title</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter book title..."
                placeholderTextColor={colors.textSecondary}
                value={newBookTitle}
                onChangeText={setNewBookTitle}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.formLabel}>Author Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter author's name..."
                placeholderTextColor={colors.textSecondary}
                value={newBookAuthor}
                onChangeText={setNewBookAuthor}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.formLabel}>Total Pages</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g. 350"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={newBookPages}
                onChangeText={setNewBookPages}
              />
            </View>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsAddBookVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSaveBook}
                activeOpacity={0.8}
              >
                <Text style={styles.modalSaveText}>Save Book</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GestureBottomSheet>

      <GestureBottomSheet
        visible={isRemoveBookVisible}
        onClose={() => setIsRemoveBookVisible(false)}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Remove Books</Text>
          <TouchableOpacity onPress={() => setIsRemoveBookVisible(false)} style={styles.modalCloseButton} activeOpacity={0.7}>
            <MaterialIcons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.removeListForm}>
          {books.length === 0 ? (
            <View style={styles.emptyRemoveContainer}>
              <MaterialIcons name="library-books" size={48} color={colors.textSecondary} style={{ opacity: 0.5 }} />
              <Text style={styles.emptyRemoveText}>No books in library to remove.</Text>
            </View>
          ) : (
             books.map((b) => (
              <View key={b.id} style={[styles.removeBookRow, shadows.card]}>
                <View style={styles.removeBookInfo}>
                  <View style={styles.removeBookCoverContainer}>
                    <Image source={{ uri: b.coverImage || 'https://via.placeholder.com/300x450.png?text=No+Cover' }} style={styles.removeBookCover} resizeMode="cover" />
                  </View>
                  <View style={styles.removeBookTextDetails}>
                    <Text style={styles.removeBookTitle} numberOfLines={1}>{b.title}</Text>
                    <Text style={styles.removeBookAuthor} numberOfLines={1}>{b.author}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeBookTrashButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    Alert.alert(
                      "Confirm Removal",
                      `Are you sure you want to remove '${b.title}' from your library?`,
                      [
                        { text: "Cancel", style: "cancel" },
                        { text: "Remove", style: "destructive", onPress: () => deleteBook(b.id) }
                      ]
                    );
                  }}
                >
                  <MaterialIcons name="delete" size={22} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.modalDoneButton}
          onPress={() => setIsRemoveBookVisible(false)}
          activeOpacity={0.8}
        >
          <Text style={styles.modalDoneText}>Done</Text>
        </TouchableOpacity>
      </GestureBottomSheet>
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
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerHighest,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileText: {
    marginLeft: 12,
  },
  welcomeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  userName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  headerSearchButton: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0d0d0d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  categoriesContainer: {
    marginVertical: spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: spacing.marginEdge,
    paddingRight: spacing.marginEdge + 12,
  },
  categoryWrapper: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryCard: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  categoryCardActive: {
    width: 56,
    height: 56,
    borderRadius: radii.xl,
    opacity: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
  },
  categoryLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  categoryLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: colors.secondary,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: spacing.marginEdge,
    marginVertical: spacing.md,
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
    borderRadius: radii.full,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_300Light',
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
  goalCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
    marginHorizontal: spacing.marginEdge,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  goalSubtitle: {
    fontFamily: 'Inter_300Light',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  onTrackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(156, 68, 15, 0.1)',
    borderRadius: radii.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.tertiary,
    marginRight: 6,
  },
  badgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: colors.tertiary,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginEdge,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  showMoreButton: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.secondary,
  },
  booksCarousel: {
    paddingLeft: spacing.marginEdge,
    paddingRight: spacing.marginEdge - 16,
    paddingVertical: 8,
  },
  dividerContainer: {
    paddingHorizontal: spacing.marginEdge,
    marginVertical: spacing.lg,
    opacity: 0.4,
  },
  sectionTitleStats: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: spacing.marginEdge,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginEdge,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: spacing.marginEdge,
    zIndex: 50,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(250, 246, 240, 0.85)',
    zIndex: 40,
  },
  backdropPressable: {
    flex: 1,
  },
  subButtonContainer: {
    position: 'absolute',
    bottom: 106,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 45,
  },
  subButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 13, 0.6)',
    justifyContent: 'flex-end',
  },
  modalKeyboardAvoiding: {
    width: '100%',
  },
  modalContent: {
    backgroundColor: 'rgba(250, 246, 240, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  bottomSheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(110, 122, 114, 0.3)',
    alignSelf: 'center',
    marginBottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: 'bold',
    color: colors.primary,
  },
  modalCloseButton: {
    padding: 6,
    borderRadius: radii.full,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  modalForm: {
    paddingBottom: 24,
  },
  coverPickerContainer: {
    width: 130,
    height: 180,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'center',
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'dashed',
  },
  coverPickerPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  coverPickerLabel: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
  },
  coverPickerHint: {
    fontSize: 10,
    fontFamily: 'Inter_300Light',
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  coverPreviewWrapper: {
    flex: 1,
    position: 'relative',
  },
  coverPreviewImage: {
    width: '100%',
    height: '100%',
  },
  changeCoverBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(181, 137, 0, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  changeCoverText: {
    color: colors.white,
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'Inter_300Light',
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: '#bdc9c1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalCancelText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: colors.textSecondary,
  },
  modalSaveButton: {
    flex: 1.5,
    paddingVertical: 16,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B58900',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  modalSaveText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: colors.white,
  },
  removeListForm: {
    paddingBottom: 24,
  },
  emptyRemoveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyRemoveText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 12,
  },
  removeBookRow: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
    borderRadius: radii.lg,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  removeBookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  removeBookCoverContainer: {
    width: 40,
    height: 56,
    borderRadius: radii.sm,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  removeBookCover: {
    width: '100%',
    height: '100%',
  },
  removeBookTextDetails: {
    marginLeft: 12,
    flex: 1,
  },
  removeBookTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  removeBookAuthor: {
    fontFamily: 'Inter_300Light',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  removeBookTrashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(186, 26, 26, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDoneButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#B58900',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  modalDoneText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: colors.white,
  },
  modalOverlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 13, 13, 0.6)',
  },
  modalOverlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  dragHandleArea: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
