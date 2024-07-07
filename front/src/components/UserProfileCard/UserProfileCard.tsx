import Image from 'next/image';
import LogoutButton from '@/app/(auth-routes)/logout/page';

const UserProfileCard = () => {
    const user = {
        name: 'John Doe',
        role: 'Software Engineer',
        avatar: '/avatar.jpg',
    };

    return (
        <div className="flex items-center justify-between p-4 w-full">
            <div className="">
                <div className="">

                </div>
                <div className="flex flex-col text-white">
                    <span className="text-xl">Test</span>
                    <span className="text-xs">Test</span>
                </div>
            </div>
            <div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default UserProfileCard;
