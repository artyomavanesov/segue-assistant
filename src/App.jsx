import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.scss';
import imgGithub from './assets/github-light.png';
import { Button, Input, Pulse, Textarea } from './components';
import { getConfiguration, updateConfiguration } from './store/slices/configurationReducer.js';
import { submitUserMessage } from './store/slices/sessionReducer.js';

const initialState = { userMessage: '', configurationView: false };

export const App = () => {
  const dispatch = useDispatch();
  const configuration = useSelector((state) => state.configuration);
  const session = useSelector((state) => state.session);

  const [instructions, setInstructions] = useState(configuration.instructions);
  const [userMessage, setUserMessage] = useState(initialState.userMessage);
  const [configurationView, setConfigurationView] = useState(initialState.viewConfiguration);

  useEffect(() => {
    dispatch(getConfiguration());
  }, []);

  useEffect(() => {
    setInstructions(configuration.instructions);
  }, [configuration.instructions]);

  useEffect(() => {
    session.assistantMessage && setUserMessage(initialState.userMessage);
  }, [session.assistantMessage]);

  const handleSubmitUserMessage = (event) => {
    event.preventDefault();
    dispatch(submitUserMessage(userMessage));
  };

  const handleUpdateConfiguration = (event) => {
    event.preventDefault();
    dispatch(updateConfiguration(instructions));
    setConfigurationView(initialState.viewConfiguration);
  };

  const style = {
    messageForm: classNames(styles.messageForm, { 
      [styles.inputLoading]: session.isLoading
    })
  };
  
  return (
    <div className={styles.app}>
      {configurationView &&
        <form
          className={styles.configuration}
          id="configuration-form"
          onSubmit={handleUpdateConfiguration}
        >
          <Textarea
            form="configuration-form"
            label="Instructions"
            onChange={setInstructions}
            placeholder="Enter instructions"
            rows="15"
            type="text"
            value={instructions}
          />
          <Button
            form="configuration-form"
            label="Save changes"
            type="submit"
          />
        </form>
      }
      {!session.assistantMessage ?
        <form
          className={style.messageForm}
          id="user-message-form"
          onSubmit={handleSubmitUserMessage}
        >
          <Input
            form="user-message-form"
            onChange={setUserMessage}
            placeholder="What are you talking about?"
            size="large"
            type="text"
            value={userMessage}
          />
        </form>
      : <p className={styles.response}>{session.assistantMessage}</p>}
      <div className={styles.pulse}>
        <Pulse session={session} />
        {`Model: ${configuration.model}`}
      </div>
      <a
        className={styles.githubLink}
        href="https://github.com/artyomavanesov/segue-assistant"
        target='_blank'
      >
        <img
          alt="GitHub"
          className={styles.githubImage}
          src={imgGithub}
        />
      </a>
    </div>
  );
};
