// import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { 
  Header, 
  CreateQuestion, 
  PassQuestion, 
  EditQuestion, 
  PrivateArea, 
  Main,
  Register,
  Login, 
} from './components/index';
import { ProtectedRoute } from './components/Authorization/ProtectedRoute';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
          <div style={{ display: "flex", justifyContent: "space-around"}}>
              <div style={{ display: "flex", flexDirection: "column"}}>
                <Routes>
                  <Route path='/' element={<Main />}/>
                  <Route path='/create' element={(
                    <ProtectedRoute>
                      <CreateQuestion/>
                    </ProtectedRoute>
                  )}/>
                  <Route path='/pass' element={(
                    <ProtectedRoute>
                      <PassQuestion />
                    </ProtectedRoute>  
                  )}/>
                  
                  <Route path='/edit' element={(
                    <ProtectedRoute>
                      <EditQuestion />
                    </ProtectedRoute>  
                  )}/>
                  
                  <Route path='/private-area' element={(
                    <ProtectedRoute>
                      <PrivateArea />
                    </ProtectedRoute>  
                  )}/>
                  
                  <Route path='/register' element={<Register />}/>
                  <Route path='/login' element={<Login />}/>
                  
                </Routes>
              </div>
          </div> 
      </header>
    </div>
  );
}

export default App;
