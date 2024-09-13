import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  faqs = [
    { question: 'How long does it take for a medic to accept?', answer: 'Our medics accept or deny in maximum a day', show: false },
    { question: 'How can i make an appointment', answer: 'You can make an appointment using your custom menu', show: false },
  ];
  
  onSubmit() {
    console.log('Form Submitted', this.contact);
  }

  toggleAnswer(faq: any) {
    faq.show = !faq.show;
    this.faqs.forEach(f => {
      if (f !== faq) {
        f.show = false;
      }
    });
  }
}

