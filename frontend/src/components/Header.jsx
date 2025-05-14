// src/components/Header.jsx
const Header = () => {
    return (
      <header style={styles.header}>
        <h1>JobMaster</h1>
      </header>
    );
  };
  
  const styles = {
    header: {
      backgroundColor: '#282c34',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
    }
  };
  
  export default Header;
  