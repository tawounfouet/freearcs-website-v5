import { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageContext } from '../context/LanguageContext';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <LanguageContext.Consumer>
          {({ t }) => (
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center space-y-4">
                <h1 className="font-raleway text-4xl font-bold text-destructive">
                  {t('errors.title')}
                </h1>
                <p className="text-muted-foreground">
                  {this.state.error?.message || t('errors.description')}
                </p>
                <Button asChild>
                  <Link to="/">{t('errors.backHome')}</Link>
                </Button>
              </div>
            </div>
          )}
        </LanguageContext.Consumer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
