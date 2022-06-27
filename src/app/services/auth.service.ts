import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User | null>;
  user!: firebase.User | null;


  constructor(public angularFireAuth: AngularFireAuth, private router: Router, private toast: HotToastService) {

    this.userData = angularFireAuth.authState;

    // giriş çıkışları kontroleder
    this.userData.subscribe(value => {

      // giriş yada çıkış yapıldığında kullanıcı bilgilerini güncelle
      this.user = value;

      // çıkış yapıldığında login sayfasına yönlendir.
      // if (!value) {
      //   setTimeout(() => {
      //     router.navigate(['']);
      //   }, 1500);
      // }
    });
  }

  // epost ve şifre ile giriş yapılmasını sağlar.
  AuthLogin(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('You have been successfully logged in!');
        Swal.fire({
          title: 'Giriş Başarılı',
          text: 'Lütfen bekleyin yönlendiriliyorsunuz.',
          icon: 'success',
          timer: 1500
        });
        setTimeout(() => {
          this.router.navigate(['admin', 'panel']);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Giriş Başarısız!',
          text: 'Lürfen bilgilerinizi kontrol ediniz.',
          icon: 'error',
          confirmButtonText: 'Tamam'
        })
      });
  }

  /* Çıkış yapılmasını sağlar */
  async SignOut() {
    await this.angularFireAuth.signOut();
  }

  IsAdmin(): boolean | undefined {
    return this.user?.email?.includes('admin@root.com');
  }

}
