'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Upload } from 'lucide-react'

export default function UserProfile() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [targetCalories, setTargetCalories] = useState('2000')
  const [newPostCaption, setNewPostCaption] = useState('')
  const [posts, setPosts] = useState([
    { id: 1, image: '/placeholder.svg?height=300&width=300', caption: 'Just finished a great workout!', likes: 120, comments: 15 },
    { id: 2, image: '/placeholder.svg?height=300&width=300', caption: 'Meal prep for the week', likes: 89, comments: 7 },
    { id: 3, image: '/placeholder.svg?height=300&width=300', caption: 'New personal best!', likes: 230, comments: 31 },
  ])

  // Mock user data
  const user = {
    name: 'Jane Doe',
    username: '@janedoe',
    bio: 'Fitness enthusiast | Healthy living advocate | Software developer',
    followers: 1234,
    following: 567,
    profileImage: '/placeholder.svg?height=128&width=128',
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  const handleSaveCalories = () => {
    // Here you would typically save the target calories to a backend
    console.log('Saving target calories:', targetCalories)
  }

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      image: '/placeholder.svg?height=300&width=300',
      caption: newPostCaption,
      likes: 0,
      comments: 0,
    }
    setPosts([newPost, ...posts])
    setNewPostCaption('')
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.username}</p>
              <p className="mt-2">{user.bio}</p>
              <div className="flex justify-center md:justify-start gap-4 mt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link"><strong>{user.followers}</strong> Followers</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Followers</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {/* Add a list of followers here */}
                      <p>Follower list would go here</p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link"><strong>{user.following}</strong> Following</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Following</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {/* Add a list of following here */}
                      <p>Following list would go here</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Button 
              onClick={handleFollowToggle}
              variant={isFollowing ? "outline" : "default"}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Daily Target Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={targetCalories}
              onChange={(e) => setTargetCalories(e.target.value)}
              className="max-w-[200px]"
            />
            <span className="text-muted-foreground">calories</span>
            <Button onClick={handleSaveCalories}>Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            <Textarea
              placeholder="Write a caption..."
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
            />
            <Button onClick={handleAddPost}>Post</Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-0">
              <img src={post.image} alt={`Post ${post.id}`} className="w-full h-auto" />
              <div className="p-4">
                <p className="mb-2">{post.caption}</p>
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    <Heart className="mr-2 h-4 w-4" /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" /> {post.comments}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}