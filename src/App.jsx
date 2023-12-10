import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.scss';
import { Button, Input, Pulse, Textarea } from './components';
import { getConfiguration, updateConfiguration } from './store/slices/configurationReducer.js';
import { submitUserMessage } from './store/slices/sessionReducer.js';
import { textToSpeech } from './utilities/textToSpeech.js';

export const App = () => {
  const dispatch = useDispatch();
  const configuration = useSelector((state) => state.configuration);
  const session = useSelector((state) => state.session);

  const [audioPlayed, setAudioPlayed] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [viewConfiguration, setViewConfiguration] = useState(false);

  useEffect(() => {
    dispatch(getConfiguration());
  }, []);

  useEffect(() => {
    setInstructions(configuration.instructions || '');
  }, [configuration.instructions]);

  const handlePlayAudio = () => {
    if (audioPlayed) return;
    setAudioPlayed(true);
    textToSpeech(session.assistantMessage);
  };

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

  const classes = {
    userMessageForm: classNames(styles.userMessageForm, {
      [styles.inputStateLoading]: session.isLoading
    }),
    assistantReponse: classNames(styles.assistantResponse, {
      [styles.audioControlsPlay]: !audioPlayed
    })
  };
  
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
          className={classes.userMessageForm}
          onSubmit={handleSubmitUserMessage}
        >
          <Input
            onChange={setUserMessage}
            placeholder="What are you talking about?"
            size="large"
            type="text"
            value={userMessage}
          />
        </form>
      ) : (
          <p
            className={classes.assistantReponse}
            onClick={handlePlayAudio}
          >
            {session.assistantMessage}
          </p>
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
