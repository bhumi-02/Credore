import "./styles.css";
import React from "react";

interface IState {
  value: string;
  emails: Array<string>;
  error?: string | null;
  items?: Array<string>;
}

export default class EmailInput extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      emails: [],
      error: null
    };
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      value: e.currentTarget.value,
      error: null
    });
  };

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (["Tab", "Enter", ","].includes(e.key)) {
      e.preventDefault();
      let email: string = this.state.value.trim();
      if (email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: ""
        });
      }
    }
  }

  handleDelete(toBeRemoved: string) {
    // TODO Issue: if two similar emails are posted, only one can be deleted
    this.setState({
      emails: this.state.emails.filter((email) => email !== toBeRemoved)
    });
  }

  isValid(email: string): boolean {
    let error = null;
    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }
    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }
    if (error) {
      this.setState({ error });
      return false;
    }
    return true;
  }

  isEmail(email: string) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  handlePaste(evt: React.ClipboardEvent<HTMLInputElement>) {
    evt.preventDefault();

    let paste: string = evt.clipboardData.getData("text");
    let emails: string[] | null = paste.match(
      /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g
    );

    if (emails) {
      var toBeAdded = emails.filter((email) => !this.isInList(email));

      this.setState({
        emails: [...this.state.emails, ...toBeAdded]
      });
    }
  }

  isInList(email: string) {
    return this.state.emails.includes(email);
  }

  public render() {
    return (
      <React.Fragment>
        {this.state.emails.map((email: string) => (
          <div className="tag-item" key={email}>
            {email}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(email)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Type or paste email addresses"
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
          onPaste={(e) => this.handlePaste(e)}
        />
        {this.state.error && <p className="error">{this.state.error}</p>}
      </React.Fragment>
    );
  }
}
