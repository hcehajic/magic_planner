import React, { useState } from 'react';
import '../styles/Settings.css';
import QRCode from 'react-qr-code';

const Settings = (props) => {
  const [selectedFont, setSelectedFont] = useState(props.userSettings.font);
  const [selectedColorPT, setSelectedColorPT] = useState(props.userSettings.colorOfPriorityTask);
  const [selectedColorNT, setSelectedColorNT] = useState(props.userSettings.colorOfNormalTask);
  const [selectedColorST, setSelectedColorST] = useState(props.userSettings.colorForSubtask);
  const [selectedColorF, setselectedColorF] = useState(props.userSettings.colorForFont);
  const [selectedColorBG, setSelectedColorBG] = useState(props.userSettings.colorForBackground);
  const [selectedColorPB, setSelectedColorPB] = useState(props.userSettings.colorForProgress);
  const [phoneLoginString] = useState(props.userSettings.phoneLoginString);
  const [id] = useState(props.user.id);
  const [dateOfBirth] = useState(props.user.dateOfBirth);
  const [name, setName] = useState(props.user.name);
  const [surname, setSurname] = useState(props.user.surname);
  const [password, setPassword] = useState(props.user.password);
  const [username] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [kidName, setKidName] = useState(props.user.kidName);
  const [kidMale] = useState(props.user.kidMale);

  const [fontSize, setFontSize] = useState(16); // Initial font size
  const [isEditingFontSize, setIsEditingFontSize] = useState(false);
  const [inputValueFontSize, setInputValueFontSize] = useState(fontSize.toString());

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSurname, setIsEditingSurname] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingKidName, setIsEditingKidName] = useState(false);

  const [nameInput, setNameInput] = useState('');
  const [surnameInput, setSurnameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [kidNameInput, setKidNameInput] = useState('');

  const API_BASE_URL = 'https://zavrsni-be-ba8430d30a0c.herokuapp.com';
  // const API_BASE_URL = 'http://localhost:8080';

  

  const handleFontChange = async (event) => {
    const selectedFont = event.target.value;

    try {
      setSelectedFont(selectedFont);
      const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/font/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ font: selectedFont }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      console.error('Error updating font:', error);
    }
  };

  const handleColorChangePriorityTask = (event) => {
    const selectedColorPT = event.target.value;
    setSelectedColorPT(selectedColorPT);
  };

  const handleApplyButtonClickPriorityTask = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/priority/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority: selectedColorPT }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeNormalTask = (event) => {
    const selectedColorNT = event.target.value;
    setSelectedColorNT(selectedColorNT);
  };

  const handleApplyButtonClickNormalTask = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/normal/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ normal: selectedColorNT }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeSubTask = (event) => {
    const selectedColorST = event.target.value;
    setSelectedColorST(selectedColorST);
  };

  const handleApplyButtonClickSubTask = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/sub/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sub: selectedColorST }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChanngeFColor = (event) => {
    const selectedColorF = event.target.value;
    setselectedColorF(selectedColorF);
  };

  const handleApplyButtonClickFColor = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/fcolor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fcolor: selectedColorF }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeBackground = (event) => {
    const selectedColorBG = event.target.value;
    setSelectedColorBG(selectedColorBG);
  };

  const handleApplyButtonClickBackground = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/background/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ background: selectedColorBG }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeProgress = (event) => {
    const selectedColorPB = event.target.value;
    setSelectedColorPB(selectedColorPB);
  };

  const handleApplyButtonClickProgress = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/progress/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: selectedColorPB }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const fontOptions = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Comic Sans MS',
    'Impact',
    'Arial Narrow',
    'Trebuchet MS',
    'Lucida Console',
    'Tahoma',
    'Palatino Linotype',
    'Garamond',
    'MS Sans Serif',
    'MS Serif',
  ];

  const handleEditButtonClickFontSize = () => {
    setIsEditingFontSize(true);
  };

  const handleInputChangeFontSize = (event) => {
    setInputValueFontSize(event.target.value);
  };

  const handleSaveButtonClickFontSize = async () => {
    const newSize = parseInt(inputValueFontSize);

    if (newSize && newSize > 0) {
      setFontSize(newSize);
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/fontsize/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ size: newSize }),
        });
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error updating font size:', error);
      }
    }

    setIsEditingFontSize(false);
  };

  const handleEditButtonClick = (field) => {
    switch (field) {
      case 'name':
        setIsEditingName(true);
        setNameInput(name);
        break;
      case 'surname':
        setIsEditingSurname(true);
        setSurnameInput(surname);
        break;
      case 'password':
        setIsEditingPassword(true);
        setPasswordInput(password);
        break;
      case 'email':
        setIsEditingEmail(true);
        setEmailInput(email);
        break;
      case 'kidName':
        setIsEditingKidName(true);
        setKidName(kidName);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setNameInput(event.target.value);
        break;
      case 'surname':
        setSurnameInput(event.target.value);
        break;
      case 'password':
        setPasswordInput(event.target.value);
        break;
      case 'email':
        setEmailInput(event.target.value);
        break;
      case 'kidName':
        setKidNameInput(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSaveButtonName = async (nameInput) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/name/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameInput }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
    }
  };

  const handleSaveButtonSurname = async (surnameInput) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/surname/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ surname: surnameInput }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
    }
  };

  const handleSaveButtonPassword = async (passInput) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/pass/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passInput }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
    }
  };

  const handleSaveButtonEmail = async (emailInput) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/email/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
    }
  };

  const handleSaveButtonKidName = async (kidNameInput) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/kid/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kidName: kidNameInput }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
    }
  };

  const handleSaveButtonClick = (field) => {
    switch (field) {
      case 'name':
        setName(nameInput);
        handleSaveButtonName(nameInput);
        setIsEditingName(false);
        break;
      case 'surname':
        setSurname(surnameInput);
        handleSaveButtonSurname(surnameInput);
        setIsEditingSurname(false);
        break;
      case 'password':
        setPassword(passwordInput);
        handleSaveButtonPassword(passwordInput);
        setIsEditingPassword(false);
        break;
      case 'email':
        setEmail(emailInput);
        handleSaveButtonEmail(emailInput);
        setIsEditingEmail(false);
        break;
      case 'kidName':
        setKidName(kidNameInput);
        handleSaveButtonKidName(kidNameInput);
        setIsEditingKidName(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="settings-container">
      <div>
        <h2>Postavke profila</h2>
        <div>
          <label htmlFor="name">Ime:</label>
          {!isEditingName ? (
            <span>{name}</span>
          ) : (
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={nameInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('name')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingName && (
            <button onClick={() => handleEditButtonClick('name')}>Uredi</button>
          )}
        </div>

        <div>
          <label htmlFor="surname">Prezime:</label>
          {!isEditingSurname ? (
            <span>{surname}</span>
          ) : (
            <div>
              <input
                type="text"
                id="surname"
                name="surname"
                value={surnameInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('surname')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingSurname && (
            <button onClick={() => handleEditButtonClick('surname')}>Uredi</button>
          )}
        </div>

        <div>
          <label htmlFor="password">Lozinka:</label>
          {!isEditingPassword ? (
            <span>{password}</span>
          ) : (
            <div>
              <input
                type="text"
                id="password"
                name="password"
                value={passwordInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('password')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingPassword && (
            <button onClick={() => handleEditButtonClick('password')}>Uredi</button>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          {!isEditingEmail ? (
            <span>{email}</span>
          ) : (
            <div>
              <input
                type="text"
                id="email"
                name="email"
                value={emailInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('email')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingEmail && (
            <button onClick={() => handleEditButtonClick('email')}>Uredi</button>
          )}
        </div>

        <div>
          <label htmlFor="kidName">Ime djeteta:</label>
          {!isEditingKidName ? (
            <span>{kidName}</span>
          ) : (
            <div>
              <input
                type="text"
                id="kidName"
                name="kidName"
                value={kidNameInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('kidName')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingKidName && (
            <button onClick={() => handleEditButtonClick('kidName')}>Uredi</button>
          )}
          {kidMale && (
            <p>Spol djeteta: Muško</p>
          )}
          {!kidMale && (
            <p>Spol djeteta: Žensko</p>
          )}
        </div>

        <div>
          <label htmlFor="username">Korisničko ime: {username}</label>
        </div>
        <div>
          <label htmlFor="dateOfBirth">Datum rođenja: {new Date(dateOfBirth).toLocaleDateString('en-GB')}</label>
        </div>

      </div>
      <div>
        <h2>Postavke aplikacije</h2>
        <label htmlFor="font-select">Izaberi font:</label>
        <select id="font-select" value={selectedFont} style={{ fontFamily: selectedFont }} onChange={handleFontChange}>
          {fontOptions.map((font) => (
            <option
              key={font}
              value={font}
              style={{ fontFamily: font }}
            >
              {font}
            </option>
          ))}
        </select>
        <p className="example-text" style={{ fontFamily: selectedFont, fontSize: fontSize }}>
          Primjer teksta u odabranom fontu
        </p>


        <div>
          <label htmlFor="fontSize">Font Size:</label>
          {!isEditingFontSize ? (
            <div>
              <span>{fontSize}px</span>
              <button onClick={handleEditButtonClickFontSize}>Edit</button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                id="fontSize"
                name="fontSize"
                value={inputValueFontSize}
                onChange={handleInputChangeFontSize}
              />
              <button onClick={handleSaveButtonClickFontSize}>Save</button>
            </div>
          )}
        </div>

        <label htmlFor="color-picker">Boja teksta:</label>
        <input type="color" id="color-picker" value={selectedColorF} onChange={handleColorChanngeFColor} />
        <div className="color-box" style={{ backgroundColor: selectedColorF }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickFColor}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Prioritetni zadaci:</label>
        <input type="color" id="color-picker" value={selectedColorPT} onChange={handleColorChangePriorityTask} />
        <div className="color-box" style={{ backgroundColor: selectedColorPT }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickPriorityTask}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Normalni zadaci:</label>
        <input type="color" id="color-picker" value={selectedColorNT} onChange={handleColorChangeNormalTask} />
        <div className="color-box" style={{ backgroundColor: selectedColorNT }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickNormalTask}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Podzadaci:</label>
        <input type="color" id="color-picker" value={selectedColorST} onChange={handleColorChangeSubTask} />
        <div className="color-box" style={{ backgroundColor: selectedColorST }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickSubTask}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Pozadina:</label>
        <input type="color" id="color-picker" value={selectedColorBG} onChange={handleColorChangeBackground} />
        <div className="color-box" style={{ backgroundColor: selectedColorBG }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickBackground}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Napredak u zadatku:</label>
        <input type="color" id="color-picker" value={selectedColorPB} onChange={handleColorChangeProgress} />
        <div className="color-box" style={{ backgroundColor: selectedColorPB }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickProgress}>
          Primijeni
        </button>
      </div>
      <div>
        <h2>Prijavljivanje na mobilni uređaj</h2>
        <div>
          <QRCode
            size={300}
            bgColor='white'
            fgColor='black'
            value={phoneLoginString}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;