import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    public show: boolean = false;
    public loginForm: FormGroup;
    public errorMessage: any;

    constructor(private fb: FormBuilder, public router: Router) {
        this.loginForm = this.fb.group({
            email: ["jperez@gmail.com", [Validators.required, Validators.email]],
            password: ["test123", Validators.required],
        });
    }

    ngOnInit() { }

    showPassword() {
        this.show = !this.show;
    }

    // Simple Login
    login() {
        if (this.loginForm.value["email"] !== "" && this.loginForm.value["password"] !== "") {
            let user = {
                email: this.loginForm.value["email"],
                password: this.loginForm.value["password"],
                name: "test user",
            };
            localStorage.setItem("user", JSON.stringify(user));
            this.router.navigate(["/ecommerce/product"]);
        }
    }
}