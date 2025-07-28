import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const defaultStyles = StyleSheet.create({ 
    defaultButton: {
        backgroundColor: '#002676',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
        marginBottom: 5,

    },
    defaultButtonAlt: {
        backgroundColor: '#FAD867',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,

    },
    defaultSidebarButton: {
        padding: 15,
    },
    defaultButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    defaultInput: {
        width: '80%',
        backgroundColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        placeholderTextColor: '#222222'
    },
    defaultInputText: {
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    defaultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    defaultScrollContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    defaultText: {
        fontSize: 16,
        color: '#333',
    },
    defaultLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    defaultCurrencyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#018943'
    },
    defaultCurrencyTitleModal: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#018943',
        textAlign: 'center',
    },
    defaultTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    defaultTitleAlt: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: '#FAD867',
    },
    defaultCircleButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
         // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android Shadow
        elevation: 5,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100, 
        right: 20,
        zIndex: 1000,
    },
    defaultCircleButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Roboto',
    },
    defaultCalloutContainer: {
        position: 'relative',
        width: 200,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android Shadow
        elevation: 5,
        zIndex: 1000,
    },
    // add inside StyleSheet.create({ … }) in defaultStyles.js

  // ─── Profile / Activity Card ───────────────────────────────────────────────
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    width: width - 32,       // remember to `import { Dimensions }` at top
  },
  cardAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 12,
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconSuccess: {
    backgroundColor: '#2ECC71',
  },
  cardIconDisabled: {
    backgroundColor: '#FAD867',
  },

  // ─── Floating Action Button ────────────────────────────────────────────────
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#002676',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

}); 

export default defaultStyles;