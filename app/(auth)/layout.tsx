const AuthLayout = ({ children }: { children: React.ReactNode } ) => {
    return ( 
        <div className="h-full flex justify-center items-center">
            <p>Auth Layout!</p>
            {children}
        </div>
     );
}
 
export default AuthLayout;