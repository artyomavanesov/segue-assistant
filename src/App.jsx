import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.scss';
import { Button, Icon, Input, Pulse, Textarea } from './components';
import { getConfiguration, updateConfiguration } from './store/slices/configurationReducer.js';
import { submitUserMessage } from './store/slices/sessionReducer.js';
import { textToSpeech } from './utilities/textToSpeech.js';

export const App = () => {
  const dispatch = useDispatch();
  const configuration = useSelector((state) => state.configuration);
  const session = useSelector((state) => state.session);

  const [instructions, setInstructions] = useState('');
  
  const [playAudio, setPlayAudio] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const [userMessage, setUserMessage] = useState('');
  const [viewConfiguration, setViewConfiguration] = useState(false);

  useEffect(() => {
    dispatch(getConfiguration());
  }, []);

  useEffect(() => {
    setInstructions(configuration.instructions || '');
  }, [configuration.instructions]);

  useEffect(() => {
    playAudio && textToSpeech(playAudio, 'The Audio API provides a speech endpoint based on our TTS');
  }, [playAudio]);

  useEffect(() => {
    session.assistantMessage && setUserMessage('');
  }, [session.assistantMessage]);

  const handleSubmitUserMessage = (event) => {
    event.preventDefault();
    if (!userMessage || userMessage === session.userMessage) return;
    dispatch(submitUserMessage(userMessage));
  };

  const handleUpdateConfiguration = (event) => {
    event.preventDefault();
    if (!instructions || instructions === configuration.instructions) return;
    dispatch(updateConfiguration(instructions));
  };

  const userMessageFormClass = classNames(styles.userMessageForm, { 
    [styles.inputStateLoading]: session.isLoading
  });

  if (!configuration.model) return;
  
  return (
    <div className={styles.app}>
      <div className={styles.configuration}>
        <Button
          icon={viewConfiguration ? 'close' : 'configuration'}
          onClick={() => setViewConfiguration((state) => !state)}
          variant="icon"
        />
        {viewConfiguration && (
          <form
            className={styles.configurationView}
            onSubmit={handleUpdateConfiguration}
          >
            <Textarea
              label="Instructions"
              onChange={setInstructions}
              placeholder="Enter instructions"
              rows="15"
              type="text"
              value={instructions}
            />
            <Button
              disabled={configuration.isLoading}
              isLoading={configuration.isLoading}
              label="Save changes"
              type="submit"
            />
          </form>
        )}
      </div>
      {!session.assistantMessage ? (
        <form
          className={userMessageFormClass}
          onSubmit={handleSubmitUserMessage}
        >
          <Input
            onChange={setUserMessage}
            placeholder="What are you talking about?"
            size="large"
            type="text"
            value={userMessage}
          />
          {/* <div
            className={styles.audioControls}
            onClick={() => setPlayAudio((state) => !state)}
          >
            <Icon
              icon={playAudio ? 'stop' : 'play'}
              color="2"
            />
          </div> */}
        </form>
      ) : (
          <p className={styles.assistantResponse}>{session.assistantMessage}</p>
      )}
      <div className={styles.pulse}>
        <Pulse session={session} />
        {`Model: ${configuration.model}`}
      </div>
      <div className={styles.github}>
        <Button
          icon="github"
          onClick={() => window.open(
            'https://github.com/artyomavanesov/segue-assistant',
            '_blank',
            'noopener, noreferrer'
          )}
          variant="icon"
        />
      </div>
    </div>
  );
};
