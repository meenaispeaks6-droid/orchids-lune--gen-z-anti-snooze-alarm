import { Button, Card, AppText } from '@/components/ui';
import { colors, layout, spacing } from '@/lib/theme';
import React from 'react';
import { Platform, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const webTargetOrigins = ['http://localhost:3000', 'https://orchids.app'];

function sendErrorToIframeParent(error: any, errorInfo?: any) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    // Only send errors that have a stack property
    if (!error?.stack) {
      return;
    }

    console.debug('Sending error to parent:', {
      error,
      errorInfo,
      referrer: document.referrer,
    });

    const errorMessage = {
      type: 'ERROR_CAPTURED',
      error: {
        message: error?.message || error?.toString() || 'Unknown error',
        stack: error?.stack,
        componentStack: errorInfo?.componentStack,
        source: 'error-boundary',
      },
      timestamp: Date.now(),
    };

    try {
      window.parent.postMessage(
        errorMessage,
        webTargetOrigins.includes(document.referrer) ? document.referrer : '*'
      );
    } catch (postMessageError) {
      console.error('Failed to send error to parent:', postMessageError);
    }
  }
}

if (Platform.OS === 'web' && typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event) => {
      event.preventDefault();
      const errorDetails = event.error ?? {
        message: event.message ?? 'Unknown error',
        filename: event.filename ?? 'Unknown file',
        lineno: event.lineno ?? 'Unknown line',
        colno: event.colno ?? 'Unknown column',
      };
      sendErrorToIframeParent(errorDetails);
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      event.preventDefault();
      sendErrorToIframeParent(event.reason);
    },
    true
  );

  const originalConsoleError = console.error;
  console.error = (...args) => {
    sendErrorToIframeParent(args.join(' '));
    originalConsoleError.apply(console, args);
  };
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    sendErrorToIframeParent(error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
        return (
          <View id="orchids-error-boundary" style={{ flex: 1, backgroundColor: colors.background }}>
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                justifyContent: 'center',
                maxWidth: layout.maxContentWidth,
                padding: layout.screenPadding,
                width: '100%',
              }}>
              <Card padding="lg" elevated>
                <View style={{ gap: spacing.lg }}>
                  <View style={{ gap: spacing.sm }}>
                    <AppText variant="label" tone="accent">
                      LUNE
                    </AppText>
                    <AppText variant="title">Something went wrong</AppText>
                    <AppText variant="body" tone="secondary">
                      {this.state.error?.message}
                    </AppText>
                    {Platform.OS !== 'web' ? (
                      <AppText variant="bodySmall" tone="muted">
                        Please check your device logs for more details.
                      </AppText>
                    ) : null}
                  </View>
                  <Button fullWidth onPress={() => this.setState({ hasError: false, error: null })}>
                    Try again
                  </Button>
                </View>
              </Card>
            </View>
          </View>
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
