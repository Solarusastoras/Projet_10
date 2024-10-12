import './_features.scss'


function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            <div className="feature-item">
            <img src="./img/icon-chat.png" alt="Chat Icon" class="feature-icon"></img>
                <h3 className="feature-item-title">User Friendly</h3>
                <p>Argent Bank is optimized for both mobile and web platforms, you can easily manage your account from anywhere.</p>
            </div>

            <div className="feature-item">
               <img src="./img/" alt="Chat Icon" class="feature-icon"></img>
                <h3 className="feature-item-title">No Fees</h3>
                <p>We don't charge any fees. No monthly maintenance fee, no minimum balance fee, no overdraft fee, and no foreign transaction fee.</p>
            </div>
            <div className="feature-item">
                <i className="fa fa-shield-alt -- feature-icon"></i>
                <h3 className="feature-item-title">Security</h3>
                <p>We are committed to keeping your data secure with the latest security measures and use multifactor authentication.</p>
            </div>
        </section>
    );
}

export default Features;