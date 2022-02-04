import "./style.css";
import Alpine from "alpinejs";
import { Application, Controller } from "@hotwired/stimulus";

Object.assign(window, {
  Stimulus: Application.start(),
  Alpine,
});

Stimulus.register(
  "hello",
  class extends Controller {
    static targets = ["name"];
    greet() {
      console.log(`Hello, ${this.name}`);
    }
    get name() {
      return this.nameTarget.value;
    }
  }
);

Stimulus.register(
  "clipboard",
  class extends Controller {
    static targets = ["source"];
    copy($event) {
      //navigator.clipboard.writeText(this.sourceTarget.value);
      $event.preventDefault();
      this.sourceTarget.select();
      document.execCommnd("copy");
    }
  }
);

Alpine.magic("clipboard", () => (subject) => {
  navigator.clipboard.writeText(subject);
});

// Alternative approach
Alpine.magic("rawClipboard", () => (ref) => {
  ref.select();
  document.execCommand("copy");
});

Alpine.data("hello", () => ({
  name: "",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
}));

Alpine.data("clipboard", () => ({
  copy() {
    this.$refs.clipboard.select();
    document.execCommand("copy");
  },
}));

Alpine.start();
